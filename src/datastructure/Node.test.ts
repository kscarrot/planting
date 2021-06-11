import { TreapRotateNode } from './Node'

describe('node rotate', () => {
  /**
   *
   * @param side 旋转的方向
   *       y                       x
   *     /   \                   /   \
   *    x     c      <=>        a      y
   *  /   \                          /   \
   * a     b                        b     c
   */
  it('rotate left', () => {
    const a = new TreapRotateNode<string>('a')
    const b = new TreapRotateNode<string>('b')
    const c = new TreapRotateNode<string>('c')
    const x = new TreapRotateNode<string>('x', a, b)
    const y = new TreapRotateNode<string>('y', x, c)

    y.rotate('left')
    expect(x.right?.value).toBe('y')
  })

  it('rotate right', () => {
    const a = new TreapRotateNode<string>('a')
    const b = new TreapRotateNode<string>('b')
    const c = new TreapRotateNode<string>('c')
    const y = new TreapRotateNode<string>('y', b, c)
    const x = new TreapRotateNode<string>('x', a, y)

    x.rotate('right')
    expect(y.left?.value).toBe('x')
  })
})
