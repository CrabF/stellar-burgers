import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useNavigate, useParams } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({title, onClose, children }) => {

  const params = useParams();

  const navigate = useNavigate();
  const closeModal = ()=>{
    onClose && onClose();
    navigate(-1)
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape';
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={closeModal}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
