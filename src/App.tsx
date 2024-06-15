function App() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Array.from(formData.entries()));
  };

  return (
    <>
      <header>Header</header>
      <h1>App</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="latitude">Latitude</label>
          <input type="text" id="latitude" name="latitude" />
          <label htmlFor="longitude">Longitude</label>
          <input type="text" id="longitude" name="longitude" />

          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
