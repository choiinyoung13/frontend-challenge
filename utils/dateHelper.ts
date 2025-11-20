import { MerchantListRes } from '@/lib/types'

export const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const getMerchantName = (
  mchtCode: string,
  merchants: MerchantListRes[]
) => {
  const merchant = merchants.find(m => m.mchtCode === mchtCode)
  return merchant?.mchtName || mchtCode
}

/**
 * 날짜를 안전하게 포맷팅하는 함수 (Hydration 에러 방지)
 * 서버와 클라이언트에서 동일한 결과를 반환합니다.
 */
export const formatDate = (dateString: string, options?: {
  month?: '2-digit' | 'numeric'
  day?: '2-digit' | 'numeric'
  hour?: '2-digit' | 'numeric'
  minute?: '2-digit' | 'numeric'
  hour12?: boolean
}): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  if (options?.month && options?.day && options?.hour && options?.minute) {
    // MM/DD HH:mm 형식
    return `${month}/${day} ${hour}:${minute}`
  }

  // 기본 형식: YYYY-MM-DD HH:mm:ss
  return `${year}-${month}-${day} ${hour}:${minute}:${String(date.getSeconds()).padStart(2, '0')}`
}

/**
 * 날짜를 한국어 형식으로 포맷팅 (Hydration 에러 방지)
 */
export const formatDateKorean = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return `${year}. ${month}. ${day}. ${hour}:${minute}:${second}`
}
