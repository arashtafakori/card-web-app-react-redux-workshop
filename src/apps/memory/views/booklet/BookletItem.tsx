import { Col, Container, Dropdown, Modal, ProgressBar, Row, Spinner } from 'react-bootstrap';
import { Booklet } from '../../models/booklet';
import { useState } from 'react';
import EditBookletTitle from './EditBookletTitle';
import DeleteBookletPermanently from './DeleteBookletPermanently';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooklet, restoreBooklet } from '../../redux/booklet/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { showUndoAction, undoItemData } from '../../redux/general/reducers/undoActionReducer';
import { undoItem } from '../../redux/booklet/bookletsListReducer';
import { useNavigate } from 'react-router-dom';
import { getIndicesListPath } from '../../../../route/paths';

interface BookletProps {
  booklet: Booklet;
  itemIndex: number;
}

const BookletItem = ({ booklet, itemIndex }: BookletProps) => {
  const navigate = useNavigate();

  const [openShowModal, setOpenShowModal] = useState(false);
  const handleShowModelClose = () => setOpenShowModal(false);
  const handleShowModelOpen = () => setOpenShowModal(true);

  const [openEditModel, setOpenEditModel] = useState(false);
  const handleEditModelClose = () => setOpenEditModel(false);
  const handleEditModelOpen = () => {
    setOpenEditModel(true);
  }

  const [openDeletePermanentlyModel, setOpenDeletePermanentlyModel] = useState(false);
  const handleDeletePermanentlyModelClose = () => {
    setOpenDeletePermanentlyModel(false);
  };
  const handleDeletePermanentlyModelOpen = () => {
    setOpenDeletePermanentlyModel(true);
  };

  //

  let dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handleIndices = () => {
    navigate(getIndicesListPath(booklet.id));
  }

  const handleDeleting = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(deleteBooklet(booklet.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Booklet deleted.',
            onUndo: () => { handleRestoring(true); }
          }));
        } else {
          dispatch(undoItem({ index: itemIndex, item: booklet } as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  const handleRestoring = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(restoreBooklet(booklet.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Booklet restored.',
            onUndo: () => { handleDeleting(true); }
          }));
        } else {
          dispatch(undoItem({ index: itemIndex, item: booklet } as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  return (
    <>
      <div className="border-bottom">
        <Row className="gx-2">
          <Col className="col-auto">
            <p onClick={handleShowModelOpen}>
              {booklet.title}
            </p>
          </Col>
          <Col className="col-auto ms-auto">
            <div className="hover-actions end-0">
              <Dropdown>
                <Dropdown.Toggle
                  variant=" -secondary"
                  className="btn-icon"
                  disabled={isLoading}
                >
                  {isLoading && <Spinner animation="border" variant="primary" style={{ width: '15px', height: '15px' }} />}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {!booklet.isDeleted && <Dropdown.Item onClick={handleIndices}>Indices</Dropdown.Item>}
                  {!booklet.isDeleted && <Dropdown.Divider />}
                  <Dropdown.Item onClick={handleShowModelOpen}>View</Dropdown.Item>
                  {!booklet.isDeleted && <Dropdown.Item onClick={handleEditModelOpen}>Edit</Dropdown.Item>}
                  {!booklet.isDeleted && <Dropdown.Item onClick={() => handleDeleting()}>Delete</Dropdown.Item>}

                  {booklet.isDeleted && <Dropdown.Item onClick={() => handleRestoring()}>Restore</Dropdown.Item>}
                  {booklet.isDeleted && <Dropdown.Item onClick={handleDeletePermanentlyModelOpen}>Delete forever</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        size="lg"
        show={openShowModal}
        onHide={handleShowModelClose}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookletDetail {...booklet}></BookletDetail>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={openEditModel}
        onHide={handleEditModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Edit booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBookletTitle onHide={handleEditModelClose} booklet={booklet}></EditBookletTitle>
        </Modal.Body>
      </Modal>

      <Modal
        show={openDeletePermanentlyModel}
        onHide={handleDeletePermanentlyModelClose}
        backdrop="static"
      >
        <Modal.Body className="p-4">
          <DeleteBookletPermanently onHide={handleDeletePermanentlyModelClose} booklet={booklet}></DeleteBookletPermanently>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookletItem;

const BookletDetail: React.FC<Booklet> = (booklet) => {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <span style={{ fontSize: '12px' }}>
             Title: <span style={{ fontSize: '15px' }}> {booklet.title}  </span>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

