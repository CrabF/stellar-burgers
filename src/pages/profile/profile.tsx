import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUserApi } from '@api';
import { updateUserInfo } from '../../services/slices/userAuthSlice';

export const Profile: FC = () => {
  const { user: userInfo } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: ''
  });

  useEffect(() => {
    setUserData({
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      password: userData.password
    });
  }, [userInfo]);

  const [formValue, setFormValue] = useState(userData);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userData.name,
      email: userData.email,
      password: ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== userData.name ||
    formValue.email !== userData.email ||
    formValue.password !== '';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateUserApi({ ...formValue });
      dispatch(updateUserInfo({ ...formValue }));
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userData.name,
      email: userData.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
