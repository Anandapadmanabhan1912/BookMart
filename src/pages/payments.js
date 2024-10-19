import React from "react";
import Image from "next/image";
import styles from './paymentpage.module.css'; // Use CSS Modules

export default function Paymentpage() {
  return (
    <section className={styles.customSection}>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-7 cart-details">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="h5">Shopping Cart</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <Image
                        src="/book1.jpg"
                        alt="Book 1"
                        width={120}
                        height={160}
                        className="rounded-3"
                      />
                      <div className="ms-4">
                        <p className="mb-2">Book Title 1</p>
                        <p className="mb-0">Author Name 1</p>
                      </div>
                    </div>
                  </th>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button className={styles.btnQuantity}>-</button>
                      <input
                        type="number"
                        className={styles.inputQuantity}
                        defaultValue={1}
                        min={0}
                      />
                      <button className={styles.btnQuantity}>+</button>
                    </div>
                  </td>
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>$12.99</p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="d-flex align-items-center">
                      <Image
                        src="/book2.jpg"
                        alt="Book 2"
                        width={120}
                        height={160}
                        className="rounded-3"
                      />
                      <div className="ms-4">
                        <p className="mb-2">Book Title 2</p>
                        <p className="mb-0">Author Name 2</p>
                      </div>
                    </div>
                  </th>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button className={styles.btnQuantity}>-</button>
                      <input
                        type="number"
                        className={styles.inputQuantity}
                        defaultValue={2}
                        min={0}
                      />
                      <button className={styles.btnQuantity}>+</button>
                    </div>
                  </td>
                  <td className="align-middle">
                    <p className="mb-0" style={{ fontWeight: "500" }}>$9.99</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-lg-4 payment-options">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Payment Options</h5>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentOption" id="creditCard" />
                  <label className="form-check-label" htmlFor="creditCard">Credit Card</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentOption" id="debitCard" />
                  <label className="form-check-label" htmlFor="debitCard">Debit Card</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentOption" id="upi" />
                  <label className="form-check-label" htmlFor="upi">UPI</label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentOption" id="netBanking" />
                  <label className="form-check-label" htmlFor="netBanking">Net Banking</label>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between">
                  <p className="mb-2">Subtotal</p>
                  <p className="mb-2">$22.98</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="mb-0">Shipping</p>
                  <p className="mb-0">$2.99</p>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between mb-4">
                  <p className="mb-2">Total (tax included)</p>
                  <p className="mb-2">$25.97</p>
                </div>

                <button className={styles.checkoutBtn}>Checkout - $25.97</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className="container text-center">
          <p>© {new Date().getFullYear()} BookMart. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
