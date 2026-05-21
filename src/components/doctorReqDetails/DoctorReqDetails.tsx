import React, { useEffect, useState } from 'react'
import type { Doctor } from '../../types/doctor';
import { useParams } from 'react-router-dom';
import "./doctorReqDetails.css"
const DoctorReqDetails = () => {
    const { doctorId } = useParams()

    const [doctor, setDoctor] = useState<Doctor>()
    const [isLoading, setIsLoading] = useState(false)
    const [isBtnLoading, setIsBtnLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${import.meta.env.VITE_BASE_URL}/doctors/${doctorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        }
        )
            .then(data => data.json())
            .then(data => {
                setDoctor(data.doctorProfile.doctor)
                console.log(data)
            })
            .finally(() => setIsLoading(false))


    }, [])


    const approveRequest = async () => {
        try {
            setIsBtnLoading(true);

            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/doctors/approve-request/${doctorId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                    },
                }
            );

            const data = await res.json();

            console.log(res)

            if (!res.ok) throw new Error(data.message || "Failed request");

            // ✅ update UI
            setDoctor(prev => {
                if (!prev) return prev;
                return { ...prev, status: "active" };
            });

        } catch (err) {
            console.error(err);
        } finally {
            setIsBtnLoading(false);
        }
    };

    return (
        <>
            {
                !isLoading ?
                    <div className="container">

                        {/* ── Breadcrumb ── */}
                        <nav className="dr-breadcrumb">
                            <a href="/dashboard"> Dashboard</a>
                            <span className="dr-breadcrumb__sep">›</span>
                            <a href="/doctor-requests">Doctor Requests</a>
                            <span className="dr-breadcrumb__sep">›</span>
                            <span className="dr-breadcrumb__current">{doctor?.name}</span>
                        </nav>

                        {/* ── Page Header ── */}
                        <div className="dr-header">
                            <div className="dr-header__left">
                                <button className="btn-back" onClick={() => history.back()} title="Go back">

                                </button>
                                <div className="dr-header__titles">
                                    <h1 className="dr-header__title">Doctor Request Details</h1>
                                    <p className="dr-header__subtitle">Review doctor registration request</p>
                                </div>
                            </div>

                            <span className={`status-badge status-badge--${doctor?.status}`}>
                                {doctor?.status}
                            </span>
                        </div>

                        {/* ── Personal Information ── */}
                        <div className="dr-card">
                            <h2 className="dr-card__title">Personal Information</h2>

                            {/* Avatar + Name */}
                            <div className="dr-profile-top">
                                {doctor?.profilePic ? (
                                    <img src={doctor?.profilePic} alt={doctor?.name} className="dr-avatar" />
                                ) : (
                                    <div className="dr-avatar--placeholder">
                                        {doctor?.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                    </div>
                                )}
                                <p className="dr-name">{doctor?.name}</p>
                            </div>

                            {/* Fields */}
                            <div className="dr-info-grid">
                                <div>
                                    <p className="dr-field__label">Email Address</p>
                                    <p className="dr-field__value">{doctor?.email}</p>
                                </div>
                                <div>
                                    <p className="dr-field__label">Phone Number</p>
                                    <p className="dr-field__value">{doctor?.phone}</p>
                                </div>
                                <div>
                                    <p className="dr-field__label">City</p>
                                    <p className="dr-field__value">{doctor?.city}</p>
                                </div>
                                <div>
                                    <p className="dr-field__label">Experience</p>
                                    <p className="dr-field__value">4</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Professional Information ── */}
                        <div className="dr-card">
                            <h2 className="dr-card__title">Professional Information</h2>
                            <div className="dr-info-col">
                                <div>
                                    <p className="dr-field__label">Specialization</p>
                                    <p className="dr-field__value">{doctor?.specialization}</p>
                                </div>
                                <div>
                                    <p className="dr-field__label">Years of Experience</p>
                                    <p className="dr-field__value">4</p>
                                </div>
                            </div>
                        </div>
                        {/* ── Identity Verification ── */}
                        <div className="dr-card">
                            <h2 className="dr-card__title">Identity Verification</h2>
                            <p className="dr-card__subtitle">Selfie photo submitted by the doctor for identity verification</p>

                            <div className="dr-verification-selfie">
                                {doctor?.IdentityVerificationImage ? (
                                    <div className="dr-selfie-wrapper">
                                        <div className="dr-selfie-badge">
                                            <span className="dr-selfie-badge__icon">📷</span>
                                            <span>Selfie Photo</span>
                                        </div>
                                        <img
                                            src={doctor?.IdentityVerificationImage}
                                            alt="Doctor selfie"
                                            className="dr-selfie-img"
                                            onClick={() => window.open(doctor?.IdentityVerificationImage, "_blank")}
                                        />
                                        <a
                                            href={doctor?.IdentityVerificationImage}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="dr-img-view-btn"
                                        >
                                            View Full Image ↗
                                        </a>
                                    </div>
                                ) : (
                                    <div className="dr-img-placeholder">
                                        <span className="dr-img-placeholder__icon">🤳</span>
                                        <p>No selfie image provided</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── National ID ── */}
                        <div className="dr-card">
                            <h2 className="dr-card__title">National ID</h2>
                            <p className="dr-card__subtitle">Front and back photos of the doctor's national ID card</p>

                            <div className="dr-nationalid-grid">
                                {/* Front */}
                                <div className="dr-nationalid-item">
                                    <div className="dr-nationalid-item__label">
                                        <span className="dr-nationalid-item__label-dot dr-nationalid-item__label-dot--front"></span>
                                        Front Side
                                    </div>
                                    {doctor?.NationalIdFront ? (
                                        <div className="dr-nationalid-img-wrapper">
                                            <img
                                                src={doctor?.NationalIdFront}
                                                alt="National ID Front"
                                                className="dr-nationalid-img"
                                                onClick={() => window.open(doctor?.NationalIdFront, "_blank")}
                                            />
                                            <a
                                                href={doctor?.NationalIdFront}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="dr-img-view-btn"
                                            >
                                                View Full Image ↗
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="dr-img-placeholder">
                                            <span className="dr-img-placeholder__icon">🪪</span>
                                            <p>No front image provided</p>
                                        </div>
                                    )}
                                </div>

                                {/* Back */}
                                <div className="dr-nationalid-item">
                                    <div className="dr-nationalid-item__label">
                                        <span className="dr-nationalid-item__label-dot dr-nationalid-item__label-dot--back"></span>
                                        Back Side
                                    </div>
                                    {doctor?.NationalIdBack ? (
                                        <div className="dr-nationalid-img-wrapper">
                                            <img
                                                src={doctor?.NationalIdBack}
                                                alt="National ID Back"
                                                className="dr-nationalid-img"
                                                onClick={() => window.open(doctor?.NationalIdBack, "_blank")}
                                            />
                                            <a
                                                href={doctor?.NationalIdBack}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="dr-img-view-btn"
                                            >
                                                View Full Image ↗
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="dr-img-placeholder">
                                            <span className="dr-img-placeholder__icon">🪪</span>
                                            <p>No back image provided</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ── Review Actions ── */}
                        <div className="dr-card">
                            <h2 className="dr-card__title">Review Actions</h2>
                            <div className="dr-actions-row">
                                {doctor?.status === "pending" && (
                                    <>
                                        <button
                                            disabled={isBtnLoading}
                                            onClick={approveRequest}
                                            className="btn-approve"
                                        >
                                            {isBtnLoading ? (
                                                <span className="loader"></span>
                                            ) : (
                                                "Approve Request"
                                            )}
                                        </button>

                                        <button
                                            disabled={isBtnLoading}
                                            className="btn-reject"
                                        >
                                            Reject Request
                                        </button>
                                    </>
                                )}

                                {doctor?.status === "active" && (
                                    <div className="success-msg">✔ Doctor Approved</div>
                                )}
                            </div>
                        </div>

                    </div >
                    :
                    <div className="container">

                        {/* ── Breadcrumb ── */}
                        <div className="sk-breadcrumb">
                            <div className="sk" style={{ width: 90, height: 14 }} />
                            <div className="sk" style={{ width: 8, height: 14, borderRadius: 2 }} />
                            <div className="sk" style={{ width: 50, height: 14 }} />
                            <div className="sk" style={{ width: 8, height: 14, borderRadius: 2 }} />
                            <div className="sk" style={{ width: 110, height: 14 }} />
                        </div>

                        {/* ── Page Header ── */}
                        <div className="sk-header">
                            <div className="sk-header__left">
                                {/* back button */}
                                <div className="sk sk--btn" style={{ width: 36, height: 36 }} />
                                <div className="sk-header__titles">
                                    <div className="sk" style={{ width: 160, height: 22 }} />
                                    <div className="sk" style={{ width: 210, height: 14 }} />
                                </div>
                            </div>
                            {/* edit button */}
                            <div className="sk sk--btn" style={{ width: 110, height: 38 }} />
                        </div>

                        {/* ── Profile Card ── */}
                        <div className="sk-card">
                            {/* section title */}
                            <div className="sk-section-title">
                                <div className="sk" style={{ width: 140, height: 14 }} />
                            </div>

                            {/* avatar + name */}
                            <div className="sk-profile-top">
                                <div className="sk sk--circle" style={{ width: 80, height: 80 }} />
                                <div className="sk-profile-meta">
                                    <div className="sk-name-row">
                                        <div className="sk" style={{ width: 160, height: 22 }} />
                                        <div className="sk sk--rounded" style={{ width: 58, height: 22 }} />
                                    </div>
                                </div>
                            </div>

                            {/* info fields */}
                            <div className="sk-info-grid">
                                <div className="sk-field">
                                    <div className="sk" style={{ width: 90, height: 12 }} />
                                    <div className="sk" style={{ width: 200, height: 16 }} />
                                </div>
                                <div className="sk-field">
                                    <div className="sk" style={{ width: 90, height: 12 }} />
                                    <div className="sk" style={{ width: 150, height: 16 }} />
                                </div>
                                <div className="sk-field">
                                    <div className="sk" style={{ width: 110, height: 12 }} />
                                    <div className="sk" style={{ width: 120, height: 16 }} />
                                </div>
                                <div className="sk-field">
                                    <div className="sk" style={{ width: 100, height: 12 }} />
                                    <div className="sk" style={{ width: 40, height: 16 }} />
                                </div>
                            </div>
                        </div>

                        {/* ── Actions Card ── */}
                        <div className="sk-card">
                            {/* section title */}
                            <div className="sk-section-title">
                                <div className="sk" style={{ width: 70, height: 14 }} />
                            </div>

                            <div className="sk-actions-row">
                                <div className="sk-input-group">
                                    <div className="sk" style={{ width: 65, height: 12 }} />
                                    <div className="sk sk--btn" style={{ width: 130, height: 38 }} />
                                </div>
                                <div className="sk sk--btn" style={{ width: 110, height: 38 }} />
                            </div>
                        </div>

                    </div>
            }

        </>
    )
}

export default DoctorReqDetails