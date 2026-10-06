import { CreditCard } from "lucide-react";

import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

function Payments({ data }) {
  const total = data.payments.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const paid = data.payments
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const pending = total - paid;

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">FINANCE</span>
          <h1>Payments</h1>
          <p>Track payment transactions and status.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CreditCard size={20} />
          </div>

          <p>Total Payments</p>
          <h2>${total.toLocaleString()}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CreditCard size={20} />
          </div>

          <p>Paid</p>
          <h2>${paid.toLocaleString()}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CreditCard size={20} />
          </div>

          <p>Pending</p>
          <h2>${pending.toLocaleString()}</h2>
        </div>
      </div>

      <div className="card table-card">
        {data.payments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <strong>{payment.id}</strong>
                    </td>

                    <td>{payment.bookingId}</td>

                    <td>{payment.customer}</td>

                    <td>
                      ${payment.amount.toLocaleString()}
                    </td>

                    <td>{payment.method}</td>

                    <td>
                      {new Date(
                        payment.date
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td>
                      <StatusBadge
                        status={payment.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Payments;