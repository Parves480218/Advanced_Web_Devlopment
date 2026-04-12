function FormResponse({ responseData }) {
  if (!responseData) {
    return null
  }

  return (
    <section className="response-box">
      <h2>Server Response</h2>
      <p>The form was submitted successfully and the response came back from httpbin.</p>

      <pre className="response-pre">
        {JSON.stringify(responseData, null, 2)}
      </pre>
    </section>
  )
}

export default FormResponse