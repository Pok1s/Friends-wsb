"use client"

import React, { useContext, useEffect, useState, useRef, useCallback  } from 'react';
import { RoomContext } from '../Context/RomContext';
import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { activeUsers } from '@/app/REDUX/Users/selectors';
import { getAllActive } from '@/app/REDUX/Users/operations';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter } from 'next/navigation';
import { UserData } from '@/app/REDUX/Users/slice';
import ConnectPage from '../ConnectPage';


export const HubComp = () => {
    const { ws, me } = useContext(RoomContext);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [activeUser, setActiveUser] = useState([]);
    const [value, setValue] = useState(0);
    const { user } = useAuth();
    const active = useSelector(activeUsers);
    const router = useRouter();
    const dispatch: Dispatch = useDispatch();
    const matchRef = useRef<UserData | null>(null);

    useEffect(()=>{
        dispatch(getAllActive({ activeUser }));
    },[activeUser, dispatch])

    useEffect(() => {
        ws.emit('user-join-hub', user?._id);
        return () => {
            
        };
    }, [user?._id, ws]);

    
    useEffect(() => {
        const handleUsersList = ({ users }) => {
            setActiveUser(users);
        };
    
        ws.on('users-list', handleUsersList);
    
        return () => {
            ws.off('users-list', handleUsersList);
        };
    }, [ws]);


    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        const info = localStorage.getItem('info');
        if (info) {
            const { selectedLanguage, selectedGender, value } = JSON.parse(info);
            setSelectedLanguage(selectedLanguage);
            setSelectedGender(selectedGender);
            setValue(value);
            const usersArray = Object.values(active); 
            const match = usersArray.find(user => {
                return user.language === selectedLanguage && user.gender === selectedGender && calculateAge(user.birthday) >= value[0] && user.birthday <= value[1];
            });
            matchRef.current = match || null;
        }
    }, [active]);
  

    const connectToRoom = () => {

    ws.emit('create-room', { peerId: me._id, value, selectedLanguage, selectedGender, userName: user?.username, userLanguage: user?.language, userGender: user?.gender, userAge: calculateAge(user?.birthday)});
    };

    return (
        <div>
        <h1>Hub</h1>
        {Object.values(active).length > 0 ? (
            <>
                {Object.values(active).map(user => (
                    <h2 key={user._id}>{user.username || user.email}</h2>
                ))}
                <button onClick={connectToRoom}>Click ME</button>
                <ConnectPage lng={undefined}/>
            </>
        ) : (
            <p>No active users found</p>
        )}
    </div>
    );
};