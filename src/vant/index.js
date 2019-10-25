/**
 * 按需引入 Vant 组件
 */
import {
  NavBar,
  Cell,
  CellGroup,
  Field,
  Button,
  Grid,
  GridItem,
  List,
  Icon
} from 'vant'

export default {
  install (Vue) {
    Vue
      .use(NavBar)
      .use(Cell)
      .use(CellGroup)
      .use(Field)
      .use(Button)
      .use(Grid)
      .use(GridItem)
      .use(List)
      .use(Icon)
  }
}
