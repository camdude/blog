import Mailchimp from "react-mailchimp-form";

const MailchimpForm = () => {
  return (
    <Mailchimp
      className="MailchimpForm"
      action="https://gmail.us7.list-manage.com/subscribe/post?u=32170d69a75ab717fb3221bc2&amp;id=c4ed95428a"
      fields={[
        {
          name: "FNAME",
          placeholder: "First Name",
          type: "text",
          required: true,
        },
        {
          name: "LNAME",
          placeholder: "Last Name",
          type: "text",
          required: true,
        },
        {
          name: "EMAIL",
          placeholder: "Email Address",
          type: "email",
          required: true,
        },
      ]}
      messages={{
        sending: "Sending...",
        success: "Thank you for subscribing, I appreciate your support!",
        error: "An unexpected internal error has occurred. Please try again later.",
        empty: "Please provide and email address.",
        duplicate: "Too many subscribe attempts for this email address",
        button: "Subscribe",
      }}
    />
  );
};

export default MailchimpForm;
