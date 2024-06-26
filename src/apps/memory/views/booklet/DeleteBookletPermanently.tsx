import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookletPermanently } from '../../redux/booklet/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { httpRequestStatus } from '../../../../utils/httpRequest';
import { Booklet } from '../../models/booklet';

interface BookletProps {
  booklet: Booklet;
  onHide: () => void;
}

const DeleteBookletPermanently = ({ booklet, onHide }: BookletProps) => {
  let dispatch = useDispatch<any>();

  const handleDeletingPermanently = () => {
    dispatch(deleteBookletPermanently(booklet.id))
      .unwrap()
      .then((data: any) => {
        onHide();
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  };

  const httpState = useSelector((state: any) => state.bookletsList);
  const isLoading = httpState.status === httpRequestStatus.Pending
    && httpState.typePrefix === deleteBookletPermanently.typePrefix;

  return (
    <Row className="row justify-content-center">
      <Col>
        <Row className="mb-4">
          Delete booklet forever?
        </Row>
        <Row className="mb-3">
          <Col xs={12} className="gy-6">
            <div className="d-flex justify-content-end gap-3">
              <Button variant="outline-secondary"
                disabled={isLoading}
                onClick={onHide} size="sm" className="px-5 px-sm-5">
                Cancel
              </Button>
              <Button variant="outline-primary"
                disabled={isLoading}
                onClick={handleDeletingPermanently} size="sm" className="px-5 px-sm-5">
                {
                  isLoading &&
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                }
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DeleteBookletPermanently;

