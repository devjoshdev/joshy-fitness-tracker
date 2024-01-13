export const metadata = {
  title: 'The JFT',
  description: 'The Joshy Fitness Tracker is the perfect way to manage the foods you\'re eating and the workouts you\'re performing. Stay on task and be the best you can be cuz Joshy believes in you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
