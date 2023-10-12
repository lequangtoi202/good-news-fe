/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'date-fns/locale';
import styles from './Comment.module.scss';
import SubComment from '../SubComment/SubComment';
import CommentImg from '../CommentImg/CommentImg';
import { UtilsFunction } from '../../utils';
import { API_URL } from '../../constant';
import { RootState } from '../../redux/store';
import { deleteComment } from '../../redux/commentReducer';
import { useUser } from '../../hook';
import { CommentModel } from '../../model/CommentModel';
import { Article } from '../../model/Article';
import Cookies from 'universal-cookie/es6';

const cx = classNames.bind(styles);
type CommentBoxProps = {
  article: Article;
};
function CommentBox({ article }: CommentBoxProps) {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const deletedSubComments = useSelector((state: RootState) => state.comment);
  const { currentUser } = useUser();
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [newComment, setNewComment] = useState('');
  const [openReplyForms, setOpenReplyForms] = useState<{ [key: string]: boolean }>({});

  const visibleComments = comments.filter((comment) => comment.parentId === null);
  const hasParentComment = comments.filter((comment) => comment.parentId !== null);
  const commentsWithSubComments = visibleComments.map((comment) => {
    const subComments = hasParentComment.filter((subComment) => subComment.parentId.id === comment.id);

    return {
      ...comment,
      subComments,
    };
  });

  const toggleExpand = (commentId: number) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}articles/${article.id}/comments`)
      .then((response) => {
        setComments(response.data);
        dispatch(deleteComment(false));
      })
      .catch((error) => {
        handleShowError('Đã có lỗi xảy ra.');
      });
  }, [article, deletedSubComments]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token === null || token === undefined) {
      handleShowError('Vui lòng đăng nhập');
      setNewComment('');
      return;
    }
    if (newComment.trim() !== '') {
      const content = {
        content: newComment,
      };
      axios
        .post(`${API_URL}articles/${article.id}/comments`, JSON.stringify(content), {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setComments([...comments, response.data]);
        })
        .catch((error) => {
          handleShowError('Đã có lỗi xảy ra!');
        });
      setNewComment('');
    }
  };

  const handleReply = (commentId: number) => {
    setOpenReplyForms((prevOpenReplyForms) => ({
      ...prevOpenReplyForms,
      [commentId]: !prevOpenReplyForms[commentId],
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    axios
      .delete(API_URL + `comments/${commentId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        dispatch(deleteComment(true));
        handleShowSuccess('Thành công');
      })
      .catch((err) => {
        handleShowError('Đã xảy ra lỗi!');
      });
  };

  const handleReplyComment = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (token === null) {
      handleShowError('Vui lòng đăng nhập');
      setNewComment('');
      return;
    }
    if (newComment.trim() !== '') {
      const content = {
        content: newComment,
      };
      axios
        .post(`${API_URL}articles/${article.id}/comments/${parentId}/comments`, JSON.stringify(content), {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setComments([...comments, response.data]);
        })
        .catch((error) => {
          handleShowError('Đã xảy ra lỗi!');
        });
      setNewComment('');
    }
  };

  return (
    <div className={cx('comment-box')}>
      <form className={cx('comment-form')} onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Viết câu trả lời..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      <div className={cx('comment-list')}>
        {commentsWithSubComments.map((comment, index) => (
          <div key={index} className={cx('comment-info-wrap')}>
            <CommentImg userId={comment.userId} />
            <div className={cx('comment-part')}>
              <div className={cx('comment')}>{comment.content}</div>
              <div className={cx('comment-interactions-wrapper')}>
                <div className={cx('interactions-action')}>
                  <span>Thích</span>
                </div>
                <div className={cx('comment-action')} onClick={() => handleReply(comment.id)}>
                  <span>Phản hồi</span>
                </div>
                {comment.subComments.length > 0 && (
                  <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(comment.id)}>
                    {expandedComments.includes(comment.id) ? 'Ẩn bớt' : 'Xem thêm'}
                  </span>
                )}
                {currentUser && (
                  <>
                    {currentUser.id === comment.userId || currentUser.id === article.authors.user.id ? (
                      <div className={cx('comment-action')} onClick={() => handleDeleteComment(comment.id)}>
                        <span>Xóa</span>
                      </div>
                    ) : null}
                  </>
                )}
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </div>
              {expandedComments.includes(comment.id) && (
                <div className={cx('sub-comments')}>
                  {comment.subComments.map((subComment, subIndex) => (
                    <SubComment key={subIndex} onReply={handleReply} subComment={subComment} article={article} />
                  ))}
                </div>
              )}
              {openReplyForms[comment.id] && (
                <form className={cx('comment-form')} onSubmit={(e) => handleReplyComment(e, comment.id)}>
                  <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentBox;
