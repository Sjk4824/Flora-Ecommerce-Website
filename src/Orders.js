import React, {useState, useEffect} from 'react'; 
import "./Orders.css"; 
import  {db} from "./firebase"; 
import {useStateValue} from "./StateProvider"; 
import Order from "./Order"; 

function Orders() {
    const [{basket, user}, dispatch] = useStateValue(); 
    const [orders, setOrders] = useState([]); 

    useEffect(() => {
        if(user){
            db  
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created' , 'desc')
                .onSnapshot(snapshot => {
                    //id we update database, it will update in real time. 
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id, 
                        data: doc.data()
                    })))
                })
        }else{
            setOrders([]); 
        }

    }, [user]);

    return (
        <div className = "orders">
            <div className = "orders__order">
                {orders?.map(order => (
                    <Order order={order}  />  
                ))}
            </div>
        </div>
    )
}

export default Orders
