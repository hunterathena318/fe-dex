import { useEffect, useRef, useState } from 'react'
import { BSC_BLOCK_TIME } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

/**
 * Returns a countdown in seconds of a given block
 */
const useBlockCountdown = (blockNumber: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const { library } = useActiveWeb3React()

  useEffect(() => {
    const startCountdown = async () => {
      const currentBlock = await library.getBlockNumber()

      if (blockNumber > currentBlock) {
        setSecondsRemaining((blockNumber - currentBlock) * BSC_BLOCK_TIME)

        // Clear previous interval
        if (timer.current) {
          clearInterval(timer.current)
        }

        timer.current = setInterval(() => {
          setSecondsRemaining((prevSecondsRemaining) => {
            if (prevSecondsRemaining === 1) {
              clearInterval(timer.current)
            }

            return prevSecondsRemaining - 1
          })
        }, 1000)
      }
    }

    startCountdown()

    return () => {
      clearInterval(timer.current)
    }
  }, [setSecondsRemaining, blockNumber, timer, library])

  return secondsRemaining
}

export default useBlockCountdown
