"use client"
import { google } from "@/app/REDUX/Auth/slice";
import { useAppDispatch } from "@/app/REDUX/Hooks/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type Params = {
  accessToken?: string;
};

export const Redirect = () => {
  const dispatch = useAppDispatch();
  const params = useParams<Params>();
  const router = useRouter();

  const accessToken = params?.accessToken;

  useEffect(() => {
    if (accessToken) {
      dispatch(google(accessToken));
      router.push(`/main`);
    }
  }, [accessToken, dispatch, router]);

  return null; 
};