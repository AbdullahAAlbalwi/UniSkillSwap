import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { useState } from 'react';
import { BookOpen, PlusCircle, Trash2, Edit, Monitor, MapPin } from 'lucide-react';

export default function MyOffersPage() {
  const { currentUser } = useAuth();
  const { offers, deleteOffer } = useApp();
  const [deleteModal, setDeleteModal] = useState(null);

  const myOffers = offers.filter((o) => o.tutorId === currentUser.id);

  const handleDelete = () => {
    deleteOffer(deleteModal);
    setDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Offers</h1>
          <p className="text-gray-600">Manage your tutoring offers</p>
        </div>
        <Link to="/my-offers/new" className="btn-primary flex items-center gap-2">
          <PlusCircle className="h-5 w-5" /> New Offer
        </Link>
      </div>

      {myOffers.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No offers yet"
          message="Create a tutoring offer to start helping students."
          action={<Link to="/my-offers/new" className="btn-primary text-sm">Create Offer</Link>}
        />
      ) : (
        <div className="space-y-4">
          {myOffers.map((offer) => (
            <div key={offer.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{offer.subject}</h3>
                    {offer.active && <span className="badge-success">Active</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {offer.tags.map((tag) => (
                      <span key={tag} className="badge-primary text-[10px]">{tag}</span>
                    ))}
                    <span className="badge text-[10px] bg-gray-100 text-gray-600">{offer.difficulty}</span>
                    <span className="badge text-[10px] bg-gray-100 text-gray-600 flex items-center gap-1">
                      {offer.mode === 'Online' ? <Monitor className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {offer.mode}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setDeleteModal(offer.id)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Created {offer.createdAt}</p>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Offer">
        <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this offer? This cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteModal(null)} className="btn-secondary">Cancel</button>
          <button onClick={handleDelete} className="btn-danger">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
