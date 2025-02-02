'use client';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import HelloPage from '../containers/HelloPage';
import { useAuth } from '../REDUX/Hooks/useAuth';

export default function Home({ params: { lng } }) {

const { isRefreshing } = useAuth()

  if (isRefreshing) return <Loader />;

  return (
    <HelloPage params={lng} />
  )
}
