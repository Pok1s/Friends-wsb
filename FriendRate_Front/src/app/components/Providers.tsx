"use client"

import { Provider as ReduxProvider } from 'react-redux';
import {persistor, store} from '../REDUX/store';
import { PersistGate } from 'redux-persist/integration/react'
import { RefreshUser } from './RefreshUser.comp';
import { RoomProvider } from './Context/RomContext';

export const Provider = ({children} : { children : React.ReactNode}) => {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RefreshUser>
                    <RoomProvider>
                        {children}
                    </RoomProvider>
                </RefreshUser> 
            </PersistGate>
        </ReduxProvider>
    );
};


