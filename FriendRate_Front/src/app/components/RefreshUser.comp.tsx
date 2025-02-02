"use client"

import React, { useEffect, useState } from 'react'
import { refreshUser } from '../REDUX/Auth/operations';
import { Dispatch } from '../REDUX/store';
import { useDispatch } from 'react-redux';
import { ProtectedRoute } from './Protected';
import { google } from '../REDUX/Auth/slice';


export const RefreshUser = ({children}) => {

    const dispatch: Dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        dispatch(refreshUser());
        setRefreshing(false);
      };
      fetchData();
    }, [dispatch, google]);
  
    if (refreshing) {
      return null; 
    }

    return (
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    );


  }