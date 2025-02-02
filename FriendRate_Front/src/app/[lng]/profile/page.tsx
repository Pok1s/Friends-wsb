import ProfileContainer from '../../containers/ProfileContainer';

const Page = ({ params: { lng } }) => {
  return (
    <ProfileContainer lng={lng} />
  )
}

export default Page;