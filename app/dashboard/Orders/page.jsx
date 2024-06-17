import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchOrders } from "@/app/lib/data";
import { deleteOrder } from "@/app/lib/actions";

const ProductsPageEmp = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, orders } = await fetchOrders(q, page);

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
            <td>User</td>
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
              <td>{order.user}</td>
              <td>{order.name}</td>
              <td>{order.mobileNo}</td> {/* Ensure this line is present */}
              <td>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.name} (x{item.quantity}) - ${item.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${order.totalAmount}</td>
              <td>${order.deliveryFee}</td>
              <td>{order.destination}</td>
              <td>{new Date(order.createdAt).toDateString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/orders/${order._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteOrder}>
                    <input type="hidden" name="id" value={order._id.toString()} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
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