'use client';
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/orders/orders.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchOrders } from "@/app/lib/data";
import { deleteOrder } from "@/app/lib/actions";
import { acceptOrder } from "@/app/lib/actions";

const ProductsPageEmp = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, orders } = await fetchOrders(q, page);
  const handleAcceptOrder = async (orderId) => {
    try {
      // Call the function to accept the order
      await acceptOrder(orderId);
      // Optionally, you can update the UI or show a success message
      console.log("Order accepted successfully!");
    } catch (error) {
      console.error("Error accepting order:", error);
      // Handle error, show error message, etc.
    }
  };
 

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a User, Name, or Mobile No..." />
        <Link href="/dashboard/orders/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <td>User</td> */}
            <td>Name</td>
            <td>Mobile No</td>
            <td>Items</td>
            <td>Total Amount</td>
            <td>Delivery Fee</td>
            <td>Destination</td>
            <td>Created Time</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {/* <td>{order.user}</td> */}
              <td>{order.name}</td>
              <td>{order.mobileNo}</td> {/* Ensure this line is present */}
              <td>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.name} (x{item.quantity}) - Rs.{item.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>Rs{order.totalAmount}</td>
              <td>Rs{order.deliveryFee}</td>
              <td>{order.destination}</td>
              <td>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(new Date(order.createdAt))}
              </td>
              <td>
                <div className={styles.buttons}>
            
                
                <button
  className={styles.addButton}
  onClick={() => handleAcceptOrder(order._id)}
>
  Accept Order
</button>
      
           
                  <button className={`${styles.button} ${styles.out}`}>
                    Out Of Delivery
                  </button>
                  <button className={`${styles.button} ${styles.finish}`}>
                    Finish Order
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPageEmp;
