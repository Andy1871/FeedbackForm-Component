import { useState } from "react";
import styles from "./FeedbackForm.module.css";

/* Star component */
type StarTypes = {
  filled: boolean;
  onClick: () => void;
};

function Star({ filled = false, onClick }: StarTypes) {
  return (
    <svg
      className={`${styles.stars} ${filled ? styles.filled : ""}`}
      onClick={onClick}
      width="30px"
      height="30px"
      viewBox="0 0 32 32"
      id="Outlined"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 2l3.8 7.7L29 11.1l-6.5 6.3 1.5 9L16 21.7l-8 4.7 1.5-9L3 11.1l9.2-1.4z" />
    </svg>
  );
}

/* Feedback Form Component */
export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [feedbackTextError, setFeedbackTextError] = useState("");

  /* Submit validates the form first, sets loading to true, sets 1.5s delay, sets success to true to reveal success message */
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    let formErrors = false;

    if (rating === 0) {
      setRatingError("Please submit a rating");
      formErrors = true;
    } else {
      setRatingError("");
    }

    if (feedbackText === "") {
      setFeedbackTextError("Please enter a message");
      formErrors = true;
    } else {
      setFeedbackTextError("");
    }

    if (formErrors) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  /* Ternary operator with success state to check if we should show the form or success message */
  return (
    <div className={styles.formContainer}>
      <button className={styles.closeButton} disabled>
        x
      </button>

      {success ? (
        <div className={styles.successContainer}>
          <div className={styles.successTick}>✔</div>
          <h4 className={styles.formTitle}>Submission Successful!</h4>
          <p className={styles.successText}>
            Thank you for submitting your feedback. It helps us provide the best
            products possible
          </p>
          <button className={styles.button} disabled>
            Close
          </button>
        </div>
      ) : (
        <>
          <h4 className={styles.formTitle}>Your Feedback Matters</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.starsSection}>
              <label className={styles.label}>
                Rate your experience with our product*
              </label>
              <div className={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= rating}
                    onClick={() => {
                      setRating(star);
                      setRatingError("");
                    }}
                  />
                ))}
              </div>
              {ratingError && (
                <span className={styles.errorText}>{ratingError}</span>
              )}
            </div>

            <div className={styles.textAreaSection}>
              <label htmlFor="textarea" className={styles.label}>
                Provide feedback below*
              </label>
              <textarea
                id="textarea"
                className={styles.textArea}
                spellCheck="false"
                value={feedbackText}
                onChange={(e) => {
                  setFeedbackText(e.target.value);
                  setFeedbackTextError("");
                }}
              />
              {feedbackTextError && (
                <span className={styles.errorText}>{feedbackTextError}</span>
              )}
            </div>

            <div className={styles.formFooter}>
              <span>*required</span>
              <button type="submit" className={styles.button}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
