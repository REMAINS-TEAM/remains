const routes = {
  main: `/`,
  categories: `/categories`,
  category: `/categories/:categoryId`,
  item: `/items/:itemId`,
  items: `/items`,
  company: `/companies/:companyId`,
  profile: `/profile`,
  payment: {
    success: '/payment/success',
  },
  offer: '/offer',
  welcome: '/welcome',
};

export default routes;
