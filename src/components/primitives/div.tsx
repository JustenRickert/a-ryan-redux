import styled from 'styled-components'

import { Board } from '../../game/board'

const margin = '55px'

export const Grid = (b: Board) => styled.div`
  display: grid;
  grid: auto-flow ${margin} / repeat(${b.size.x}, ${margin});
`

export const Square = styled.div`
  display: flex;
`

export const Piece = styled.div`
  margin: auto;
`

export const BlackSquare = Square.extend`
  background-color: black;
  color: black;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
`

export const WhiteSquare = Square.extend`
  background-color: AntiqueWhite;
  color: white
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`
