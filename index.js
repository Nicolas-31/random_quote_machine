const App = () => {
  const [quotes, setQuotes] = React.useState([])
  const [randomQuote, setRandomQuote] = React.useState('')
  const [color, setColor] = React.useState('#111')

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://type.fit/api/quotes')
      const data = await response.json()
      setQuotes(data)
      let randomIndex = Math.floor(Math.random() * data.length)
      setRandomQuote(data[randomIndex])
    }
    fetchData()
  }, [])

  const getNewQuote = () => {
     const colors = [
       '#16a085',
       '#27ae60',
       '#2c3e50',
       '#f39c12',
       '#e74c3c',
       '#9b59b6',
       '#FB6964',
       '#342224',
       '#472E32',
       '#BDBB99',
       '#77B1A9',
       '#73A857'
     ]
    let randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
    let randomColorIndex = Math.floor(Math.random() * colors.length)
    setColor(colors[randomColorIndex])
  };

  return (
    <div style={{ backgroundColor: color, minHeight: '100vh' }}>
      <div id="quote-box" className="container pt-5">
        <div className="bg-light p-5">
          <div className="card">
            <div className="card-header">Motivational Quotes</div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 id="author" className="card-title">
                    {randomQuote.author || 'No Author'}
                  </h5>
                  <p id="text" className="card-text">&quot;{randomQuote.text}&quot;</p>
                </>
              ) : (
                <h2>Loading</h2>
              )}

              <div>
                <a id="tweet-quote"
                  href={
                    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                    encodeURIComponent(
                      '"' + randomQuote.text + '" ' + randomQuote.author
                    )
                  }
                  target="_blank"
                  className="btn btn-warning me-2"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                <a
                  href={
                    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                    encodeURIComponent(randomQuote.author) +
                    '&content=' +
                    encodeURIComponent(randomQuote.text) +
                    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
                  }
                  target="_blank"
                  className="btn btn-danger"
                >
                  <i className="fab fa-tumblr"></i>
                </a>

                <button id="new-quote" onClick={getNewQuote} className="btn btn-primary float-end">
                  New Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
