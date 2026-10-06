import { useState } from "react";
import { Plus, Edit3, Trash2, MapPin } from "lucide-react";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";

function Destinations({
  data,
  updateData,
  notify,
}) {
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: "",
    country: "",
    trips: 0,
    image: "",
  });

  const create = () => {
    setSelected(null);

    setForm({
      name: "",
      country: "",
      trips: 0,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    });

    setModal("form");
  };

  const edit = (item) => {
    setSelected(item);
    setForm(item);
    setModal("form");
  };

  const save = () => {
    if (!form.name || !form.country) {
      notify("Name and country are required.", "error");
      return;
    }

    if (selected) {
      updateData(
        "destinations",
        data.destinations.map((item) =>
          item.id === selected.id
            ? { ...form, trips: Number(form.trips) }
            : item
        )
      );

      notify("Destination updated.");
    } else {
      updateData("destinations", [
        ...data.destinations,
        {
          ...form,
          id: Date.now(),
          trips: Number(form.trips),
        },
      ]);

      notify("Destination created.");
    }

    setModal(null);
  };

  const remove = () => {
    updateData(
      "destinations",
      data.destinations.filter(
        (item) => item.id !== selected.id
      )
    );

    notify("Destination deleted.");
    setModal(null);
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">TRAVEL</span>
          <h1>Destinations</h1>
          <p>Manage your popular travel destinations.</p>
        </div>

        <button
          className="primary-btn"
          onClick={create}
        >
          <Plus size={17} />
          Add Destination
        </button>
      </div>

      {data.destinations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="destination-management-grid">
          {data.destinations.map((item) => (
            <div
              className="management-destination"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="management-info">
                <h3>{item.name}</h3>

                <p>
                  <MapPin size={14} />
                  {item.country}
                </p>

                <span>{item.trips} trips</span>
              </div>

              <div className="card-actions">
                <button onClick={() => edit(item)}>
                  <Edit3 size={15} />
                </button>

                <button
                  className="danger-icon"
                  onClick={() => {
                    setSelected(item);
                    setModal("delete");
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === "form" && (
        <Modal
          title={
            selected
              ? "Edit Destination"
              : "Add Destination"
          }
          onClose={() => setModal(null)}
          onSubmit={save}
        >
          <div className="form-grid">
            <label>
              Destination Name *
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
              Country *
              <input
                value={form.country}
                onChange={(e) =>
                  setForm({
                    ...form,
                    country: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Number of Trips
              <input
                type="number"
                value={form.trips}
                onChange={(e) =>
                  setForm({
                    ...form,
                    trips: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Image URL
              <input
                value={form.image}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.value,
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

export default Destinations;