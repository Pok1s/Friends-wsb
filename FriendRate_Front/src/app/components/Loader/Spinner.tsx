import { Oval } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <Oval
      visible={true}
      height="30"
      width="30"
      color="#FCFBF5"
      secondaryColor='#FCFBF5'
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}

export default Spinner;