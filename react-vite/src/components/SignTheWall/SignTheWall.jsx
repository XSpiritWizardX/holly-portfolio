import { useState, useEffect } from 'react';
import './SignTheWall.css';

function SignTheWall() {
    const [signatures, setSignatures] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        message: '',
        color: '#ffffff'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const colors = [
        '#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1',
        '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8',
        '#f7dc6f', '#bb8fce', '#85c1e9', '#f8c471'
    ];

    useEffect(() => {
        fetchSignatures();
    }, []);

    const fetchSignatures = async () => {
        try {
            const response = await fetch('/api/signatures');
            const data = await response.json();
            setSignatures(data.signatures || []);
        } catch (err) {
            console.error('Error fetching signatures:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/signatures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSignatures([data, ...signatures]);
                setFormData({ name: '', message: '', color: '#ffffff' });
            } else {
                setError(data.error || 'Failed to submit signature');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="sign-the-wall">
            <div className="wall-header">
                <h2>Sign My Wall</h2>
                <p>Leave your mark and be part of my portfolio forever!</p>
                <div className="signatures-wall">


                    {signatures.map((signature, index) => (
                        <div key={signature.id || index}>

                        <div className="signature-card rainbow-border">
  {/* card content */}
                        <div
                            key={signature.id}
                            className="signature-card"
                            style={{
                                color: signature.color,
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className="signature-message">{signature.message}</div>
                            <div className="signature-author">- {signature.name}</div>
                            <div className="signature-date">
                                {new Date(signature.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
            </div>



<div className="signature-form rainbow-border">
  {/* form content */}

            <form onSubmit={handleSubmit} className="signature-form">
                <div className="form-group">
                    <input

                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength="50"
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea

                    maxLength={150}
                        name="message"
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={handleChange}

                        rows="3"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Choose your color:</label>
                    <div className="color-picker">
                        {colors.map(color => (
                            <button
                                key={color}
                                type="button"
                                className={`color-option ${formData.color === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setFormData({...formData, color})}
                            />
                        ))}
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-butty"
                >
                    {isSubmitting ? 'Signing...' : 'Sign the Wall'}
                </button>
            </form>
</div>






        </div>
    );
}

export default SignTheWall;
