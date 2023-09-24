import styles from '@/app/css/searchbar.module.css'

export default function Searchbar() {
  return (
    <div>
      <form onSubmit="event.preventDefault();" role="search" className={styles.form}>
        <label htmlFor="search" className={styles.label}>Search for stuff</label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          autoFocus
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Go</button>
      </form>
    </div>
  );
}
