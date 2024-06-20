import { addProduct, addproductEmp ,saveAcceptedOrder} from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const ConfirmOrder = () => {
  return (
    <div className={styles.container}>
      <form action={saveAcceptedOrder} className={styles.form}>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConfirmOrder;