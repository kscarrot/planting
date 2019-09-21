import HashTable from './HashTable'

test('test hash function ', () => {
  const ht = new HashTable()
  expect(ht.hash('The quick brown fox jumps over the lazy dog')).toBe(-609428141)
  expect(ht.hash('')).toBe(0)
  const longString =
    'k"hg3q#+~/l2Eljan;DB x.P<pX[!C`/Nr6w~YIPz;X3z<]b6nDvda|ToZM+a%D#' +
    ':PE@z[bl$/PRT7m76}FV=UW/3SPkkdRkuC~9TKgMg.^#n)iiq{AZ?}+pv;>%-:iA' +
    '/b/hG($8-SZcZX871&;fDEWthw.b5agzov],X00--O:mcQ$JFi-4uIo"D:(r(yvs' +
    'dj%Pq/b$sY5(O8!{^icIBwTT>,fv=$@d<tqde$]?X##Gb![s44rA=fSI1o#S;0V[' +
    'rPy#=z7Vf0"Si!D8oN5;qNiXNA_)(9*0JD<r$uY~LijTd@dtA+N-GK5yC80WRiJ{' +
    '@7x:WbD/$k6Db~,/aU7n)9?{cP4z6>D(>167.xqSDXjBS#TV3oIjMGCo9)!e&hO ' +
    'I<[jlz3]r-FFFeNe#Ch4oQ,4A;i,3&3Oq*2LW(KFUW9b$}"z8,B>HRH9.D%.S~o3' +
    'L_6{wu!Kp538AmLREp*ZP`]K9}uRGEEUj37[PQq2Y>cf_{L={Ko"ADnZ8d[q0{-3' +
    '@=e8UC4y)@aCefzleW[>Q8y}@Of9{WNI|?ShSF7C{<JYRb6QBrNauQzUio(]XIsk' +
    's`*F9tK|GBhaj.W%XV~7zSx}tFBI6h}|a sah/$-|fJs_;Ci5q-_d]+-0o/vY|:6' +
    '~cx%aJx8sy*G!"wVL-S?g.BPSB`N +QPCvTar`[= WYsnxR2fmE2}ON]8C:*g}*V' +
    't%Bh1D`,s`>62(A4o<g9G2d+)R;;p`?wUdr^uy:ibCX)qmo.xH/rf"xmC-p($akh' +
    'gVM;#K i )m%I8(0qFCHbzr;gVAvj/jrae=0DgF3C?&9Rvs$&J"r`yvrhM^A=?Wi' +
    'fE$O[YV8X3PV6TR(*Ed4|y[8tG~K=[MxgLI%yx]16Kg3YSHE{2^1TOAnf`EsKWm,' +
    'WGD)s;Zs<8K6(K_kVko"mV82Pcl)0Rx}jfq3VBm:MOX/gLfSPvLx~%(3jHh5gG2e' +
    'JaQ|nW}ekR_W5Ldv`@j^hd%Wiw6moGekrS>k7gRR|dd?7Pi:`0; r_wq=-F-e(iY'
  expect(ht.hash(longString)).toBe(-998071508)
})

test('test hash table', () => {
  const ht = new HashTable()
  const a = { a: 'foo', b: 'bar' }
  ht.set('foo', a)
  expect(ht.get('foo')).toStrictEqual(a)
  const a1 = { a: 'foo1', b: 'bar2' }
  ht.set('foo', a1)
  expect(ht.get('foo')).toStrictEqual(a1)
  ht.delete('foo')
  expect(ht.get('foo')).toBe(null)
  expect(ht.size).toBe(0)
  expect(ht.get('abcdefg')).toBe(null)
})

test('test not string type key', () => {
  const ht = new HashTable()
  const keyFromObj = { key: 'key' }
  ht.set(keyFromObj, 1)
  expect(ht.get(keyFromObj)).toBe(1)
})

test('test hash collision', () => {
  const ht = new HashTable(2)
  ht.set(1, 1)
  ht.set(2, 2)
  ht.set(3, 3)
  ht.delete(3)
  ht.delete(4)
})
