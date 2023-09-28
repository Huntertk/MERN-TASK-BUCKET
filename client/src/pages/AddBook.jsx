import { useState } from "react"


const AddBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')

  




  return (
    <section className='bookMainContainer'>
        <div className="bookContainer">
            <form>
              <h1>Add Book</h1>
                 <input 
                type="text" 
                placeholder='enter book title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                type="text" 
                placeholder='enter author name' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
        <select  onChange={(e) => setCategory(e.target.value)} className="form-select">
          <option defaultValue disabled>
            Select Category
          </option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="poetry">Poetry</option>
          <option value="mystery">Mystery</option>
          <option value="biography">Biography</option>
          <option value="other">Other</option>
      </select>
                <button>Add Book</button>
            </form>
        </div>
    </section>
  )
}

export default AddBook