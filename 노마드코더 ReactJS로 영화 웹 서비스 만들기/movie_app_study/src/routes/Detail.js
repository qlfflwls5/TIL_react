import React from "react"


class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props
    if (location.state === undefined) {
      history.push("/")
    }
  }
  render() {
    if (!this.props.location.state) {
      return null
    }
    const { location: {state: {title, year, summary, genres, poster}} } = this.props
    return (
      <div>
        <img src={poster} alt={title} title={title} />
        <h1>{title}</h1>
        <h3>{year}</h3>
        <p>{summary}</p>
        <ul>
          {genres.map((genre, index) => {
            return <li key={index}>{genre}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default Detail