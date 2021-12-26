import React from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';

// TODO linter
// TODO: тут подумать что будет отображаться

function MainPage() {
  return (
    <MainLayout>
      <WithMenuLayout>Main page</WithMenuLayout>
    </MainLayout>
  );
}

export default React.memo(MainPage);
