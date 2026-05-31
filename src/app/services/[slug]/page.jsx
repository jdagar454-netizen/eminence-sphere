"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function ServiceDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const docRef = doc(db, "services", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() });
        } else {
          router.push('/not-found');
        }
      } catch (err) {
        console.warn("Error fetching service details:", err.message || err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchService();
  }, [slug, router]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading service details...</div>;
  }

  if (!service) return null;

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <Link href="/services" style={{ color: 'var(--gold-primary)', display: 'inline-block', marginBottom: '2rem' }}>&larr; Back to Services</Link>
          <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>Premium Service</div>
          <h1 className="heading-xl">{service.title}</h1>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '3rem' }} dangerouslySetInnerHTML={{ __html: service.description }} />
          
          <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Interested in {service.title}?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Let's discuss how we can help your business.</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
