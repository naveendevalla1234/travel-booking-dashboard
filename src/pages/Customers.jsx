import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
} from "lucide-react";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";

function Customers({
  data,
  updateData,
  notify,
}) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    bookings: 0,
  });

  const customers = useMemo(() => {
    return data.customers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.city}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data.customers, search]);

  const save = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.city
    ) {
      notify("Please fill all fields.", "error");
      return;
    }

    if (selected) {
      updateData(
        "customers",
        data.customers.map((item) =>
          item.id === selected.id ? form : item
        )
      );

      notify("Customer updated.");
    } else {
      updateData("customers", [
        ...data.customers,
        {
          ...form,
          id: Date.now(),
          bookings: Number(form.bookings || 0),
        },
      ]);

      notify("Customer added.");
    }

    setModal(null);
  };

  const openForm = (customer = null) => {
    setSelected(customer);

    setForm(
      customer || {
        name: "",
        email: "",
        phone: "",
        city: "",
        bookings: 0,
      }
    );

    setModal("form");
  };

  const remove = () => {
    updateData(
      "customers",
      data.customers.filter(
        (item) => item.id !== selected.id
      )
    );

    notify("Customer deleted.");
    setModal(null);
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">CUSTOMERS</span>
          <h1>Customers</h1>
          <p>Manage customer profiles and bookings.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => openForm()}
        >
          <Plus size={17} />
          Add Customer
        </button>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search customers..."
          />
        </div>
      </div>

      <div className="card table-card">
        {customers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Bookings</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <strong>{customer.name}</strong>
                    </td>

                    <td>{customer.email}</td>

                    <td>{customer.phone}</td>

                    <td>{customer.city}</td>

                    <td>{customer.bookings}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() =>
                            openForm(customer)
                          }
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          className="danger-icon"
                          onClick={() => {
                            setSelected(customer);
                            setModal("delete");
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === "form" && (
        <Modal
          title={
            selected
              ? "Edit Customer"
              : "Add Customer"
          }
          onClose={() => setModal(null)}
          onSubmit={save}
        >
          <div className="form-grid">
            <label>
              Name *
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Email *
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Phone *
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </label>

            <label>
              City *
              <input
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </Modal>
      )}

      {modal === "delete" && (
        <ConfirmModal
          message={`Delete ${selected?.name}?`}
          onCancel={() => setModal(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}

export default Customers;