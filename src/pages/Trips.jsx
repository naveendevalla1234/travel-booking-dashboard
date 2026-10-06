import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

function Trips({ data, updateData, notify }) {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    trip: "",
    destination: "",
    date: "",
    price: "",
    status: "Pending",
    customer: "",
  });

  const perPage = 5;

  const filtered = useMemo(() => {
    let result = [...data.trips];

    result = result.filter((trip) => {
      const text =
        `${trip.trip} ${trip.customer} ${trip.destination}`
          .toLowerCase();

      const matchesSearch = text.includes(
        search.toLowerCase()
      );

      const matchesDestination =
        destination === "All" ||
        trip.destination === destination;

      return (
        matchesSearch &&
        matchesDestination
      );
    });

    result.sort((a, b) => {
      if (sort === "price") {
        return b.price - a.price;
      }

      return new Date(a.date) - new Date(b.date);
    });

    return result;
  }, [data.trips, search, destination, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / perPage)
  );

  const current = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const openCreate = () => {
    setForm({
      trip: "",
      destination: "",
      date: "",
      price: "",
      status: "Pending",
      customer: "",
    });

    setSelected(null);
    setModal("form");
  };

  const openEdit = (trip) => {
    setSelected(trip);
    setForm(trip);
    setModal("form");
  };

  const saveTrip = () => {
    if (
      !form.trip ||
      !form.destination ||
      !form.date ||
      !form.price ||
      !form.customer
    ) {
      notify(
        "Please fill all required fields.",
        "error"
      );
      return;
    }

    if (selected) {
      updateData(
        "trips",
        data.trips.map((item) =>
          item.id === selected.id
            ? {
                ...form,
                price: Number(form.price),
              }
            : item
        )
      );

      notify("Trip updated successfully.");
    } else {
      updateData("trips", [
        ...data.trips,
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
        },
      ]);

      notify("Trip created successfully.");
    }

    setModal(null);
  };

  const deleteTrip = () => {
    updateData(
      "trips",
      data.trips.filter(
        (item) => item.id !== selected.id
      )
    );

    notify("Trip deleted successfully.");
    setModal(null);
    setSelected(null);
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">MANAGEMENT</span>
          <h1>Trips</h1>
          <p>Create, edit and manage travel trips.</p>
        </div>

        <button
          className="primary-btn"
          onClick={openCreate}
        >
          <Plus size={17} />
          Create Trip
        </button>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search trips or customers..."
          />
        </div>

        <div className="filter-item">
          <SlidersHorizontal size={16} />

          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">
              All destinations
            </option>

            {data.destinations.map((item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date">
            Sort by Date
          </option>

          <option value="price">
            Sort by Price
          </option>
        </select>
      </div>

      <div className="card table-card">
        <div className="table-wrap">
          {current.length === 0 ? (
            <EmptyState
              title="No trips found"
              message="Try changing your search or filters."
            />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Trip</th>
                  <th>Destination</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {current.map((trip) => (
                  <tr key={trip.id}>
                    <td>
                      <strong>{trip.trip}</strong>
                    </td>

                    <td>{trip.destination}</td>

                    <td>{trip.customer}</td>

                    <td>
                      {new Date(
                        trip.date
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td>
                      ${trip.price.toLocaleString()}
                    </td>

                    <td>
                      <StatusBadge
                        status={trip.status}
                      />
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => {
                            setSelected(trip);
                            setModal("view");
                          }}
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() =>
                            openEdit(trip)
                          }
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          className="danger-icon"
                          onClick={() => {
                            setSelected(trip);
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
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {modal === "form" && (
        <Modal
          title={selected ? "Edit Trip" : "Create Trip"}
          onClose={() => setModal(null)}
          onSubmit={saveTrip}
          submitText={selected ? "Update Trip" : "Create Trip"}
        >
          <div className="form-grid">
            <label>
              Trip Name *
              <input
                value={form.trip}
                onChange={(e) =>
                  setForm({
                    ...form,
                    trip: e.target.value,
                  })
                }
                placeholder="Paris Explorer"
              />
            </label>

            <label>
              Destination *
              <select
                value={form.destination}
                onChange={(e) =>
                  setForm({
                    ...form,
                    destination: e.target.value,
                  })
                }
              >
                <option value="">
                  Select destination
                </option>

                {data.destinations.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Customer *
              <input
                value={form.customer}
                onChange={(e) =>
                  setForm({
                    ...form,
                    customer: e.target.value,
                  })
                }
                placeholder="Customer name"
              />
            </label>

            <label>
              Date *
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Price *
              <input
                type="number"
                min="1"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
                placeholder="1500"
              />
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </label>
          </div>
        </Modal>
      )}

      {modal === "view" && selected && (
        <Modal
          title="Trip Details"
          onClose={() => setModal(null)}
          onSubmit={() => setModal(null)}
          submitText="Close"
        >
          <div className="details-grid">
            <div>
              <small>Trip</small>
              <strong>{selected.trip}</strong>
            </div>

            <div>
              <small>Destination</small>
              <strong>{selected.destination}</strong>
            </div>

            <div>
              <small>Customer</small>
              <strong>{selected.customer}</strong>
            </div>

            <div>
              <small>Price</small>
              <strong>
                ${selected.price.toLocaleString()}
              </strong>
            </div>

            <div>
              <small>Status</small>
              <StatusBadge status={selected.status} />
            </div>
          </div>
        </Modal>
      )}

      {modal === "delete" && selected && (
        <ConfirmModal
          message={`Delete "${selected.trip}"? This action cannot be undone.`}
          onCancel={() => setModal(null)}
          onConfirm={deleteTrip}
        />
      )}
    </>
  );
}

export default Trips;