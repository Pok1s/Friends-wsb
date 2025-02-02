import NotFound from '../not-found';

const notFounded = ({ params: { lng } }) => {return (
  <NotFound params={lng} />
)};

export default notFounded;
