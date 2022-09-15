import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import * as styles from './styles';
import { getCurrentUser } from 'store/selectors/user';
import AuthLayout from 'layouts/AuthLayout';
import { Edit as EditIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditProfilePopup from 'components/Popups/EditProfilePopup';
import Header from 'components/Header';
import ProfileItems from 'pages/ProfilePage/ProfileItems';
import ProfileInfo from 'pages/ProfilePage/ProfileInfo';

function ProfilePage() {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const user = useSelector(getCurrentUser);

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => setEditProfileModalOpen(true);

  return (
    <AuthLayout ref={layoutRef}>
      <Box sx={styles.contentContainer}>
        <Header
          title="Мой профиль"
          withBackButton
          left={
            <IconButton
              color={!user?.name ? 'warning' : 'secondary'}
              onClick={openEditProfileModal}
              sx={!user?.name ? styles.accentedBtn : null}
            >
              <EditIcon />
            </IconButton>
          }
        />

        <ProfileInfo user={user} />

        <Header title="Мои предложения" />
        <ProfileItems userId={user?.id} layoutRef={layoutRef} />
      </Box>

      <EditProfilePopup
        open={editProfileModalOpen}
        setOpen={setEditProfileModalOpen}
      />
    </AuthLayout>
  );
}

export default React.memo(ProfilePage);
