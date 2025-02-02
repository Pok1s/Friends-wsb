import { useAuth } from '@/app/REDUX/Hooks/useAuth';
import { Dispatch } from '@/app/REDUX/store';
import { useRouter, usePathname } from 'next/navigation';
import { createContext, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  socketIOClient  from 'socket.io-client';
import { addPeerAction, clearPeersAction, removePeerAction } from './PeerAction';
import { peersReducer } from './peersReducer';
import Peer from "peerjs";
import { v4 as uuidV4 } from 'uuid';
import { setUserNames } from '@/app/REDUX/Users/slice';
import { usersNames } from '@/app/REDUX/Users/selectors';
import { OpositUser } from '../ConnectPage/AuthorizedUser';



const server = 'http://localhost:3000'
const server2 = 'https://api.friendsrate.org'  

export const RoomContext = createContext<any | null>(null);

const ws = socketIOClient(server2);

export const RoomProvider = ({children}) => {
    const router = useRouter();
    const pathname = usePathname()
    const match = pathname?.match(/\/[a-z]+\/(chatRoom)\/?/);
    const [me, setMe] = useState<Peer | null>(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [rateModalOpen, setRateModalOpen] = useState(false)
    const [stream, setStream] = useState<MediaStream>();
    const { user } = useAuth(); 
    const usersInRoom = useSelector(usersNames)

    const opositUser: OpositUser | null = Array.isArray(usersInRoom) 
    ? usersInRoom.find((u: OpositUser) => u.userName !== user?.username) || null 
    : null;
    const reduxDispatch = useDispatch();
      
    const handleUserList = useCallback(({ users, names, roomId }: { users: string[], names: {}, roomId: string }) => {
       
        router.push(`/chatRoom/${roomId}`);
        users.forEach((peerId) => {
            if (stream && me) {
                const call = me.call(peerId, stream);
                call?.on("stream", (userVideoStream: MediaStream) => {
                    dispatch(addPeerAction(peerId, userVideoStream));
                });
            }
        });

   
        reduxDispatch(setUserNames(names));

    }, [reduxDispatch, router, stream, me]);

    const clearPeers = useCallback(() => {
        dispatch(clearPeersAction());
        if (user !== null && !opositUser?.userName.startsWith('Unregistered User')) {
        setRateModalOpen(true)}
        else {
            if (user) {
                router.push('/main');
              } else {
                router.push('/');
              }
        }
    }, [opositUser?.userName, router, user]);

    // const removePeer = useCallback(
    //     (peerId: string) => {
    //       dispatch(removePeerAction(peerId));
    //       setRateModalOpen(true);
    //     },
    //     [dispatch]
    //   );

  useEffect(() => {
    if (typeof window !== "undefined") {
    const meId = uuidV4();
    const peer = new Peer(meId, {
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        }
      });
    setMe(peer);
    try {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                setStream(stream);
            });
    } catch (err) {
        console.error({ err });
    }

}}, []);

useEffect(()=>{
    ws.on("get-user", handleUserList);
    ws.on("user-disconnected", clearPeers);
}, [handleUserList, clearPeers])

useEffect(() => {
  if (!stream) return;
  if (!me) return;
    
  ws.on(
      "user-joined",
      ({ peerId, names}) => {
        reduxDispatch(setUserNames(names)); 
        console.log(`${peerId} was connected`);
          const call = stream && me.call(peerId, stream);
          call.on("stream", (userVideoStream: MediaStream) => {
              dispatch(addPeerAction(peerId, userVideoStream));
              console.log("111111111111", peerId);
              
          });
      
       
      }
  );


  me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
          dispatch(addPeerAction(call.peer, userVideoStream));
          console.log("22222222222222222", call.peer);
      });
  });
  return () => {
    ws.off("user-joined");
    ws.off("get-user");
    ws.off("user-disconnected");
};
}, [stream, me, handleUserList, clearPeers, reduxDispatch]);

useEffect(() => {

        const handlePopState = () => {
            ws.emit("end-call");
        }
    
        const handleBeforeUnload = (event) => {
            ws.emit("end-call");
            event.returnValue = '';
        
        };
    
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
}, []);

const openRateModal = () => setRateModalOpen(true);
const closeRateModal = () => setRateModalOpen(false);
    
   return (
   <RoomContext.Provider value={{ws, me, stream, peers, rateModalOpen, openRateModal, closeRateModal, clearPeers }}>{children}</RoomContext.Provider>)
}
