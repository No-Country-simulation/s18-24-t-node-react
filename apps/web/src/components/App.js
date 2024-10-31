export const App = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen mb-20">
        {children}
      </main>

      <footer className='bg-[#5FA777] h-30 pt-40' />
    </>
  )
}
