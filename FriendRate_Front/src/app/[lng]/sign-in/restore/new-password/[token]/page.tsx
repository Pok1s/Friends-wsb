import SignInContainer from "@/app/containers/SignInContainer";

const Page = ({ params: { lng } }) => {
  return (
    <SignInContainer lng={lng} />
  )
}

export default Page;