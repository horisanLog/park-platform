import { render } from '@testing-library/react'

import Home from './'

describe('Sampleコンポーネント', () => {
  test('レンダーされる', () => {
    const home = render(<Home />)
    expect(home.getByText('home')).toBeTruthy()
    expect(home).toMatchSnapshot()
  })
})
