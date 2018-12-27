import React from "react"

import MdCheckboxBlank from "react-icons/lib/md/check-box-outline-blank"
import MdCheckbox from "react-icons/lib/md/check-box"
import Collapsible from "../shared/collapsible"

import { scale } from "../../utils/typography"
import { colors } from "../../utils/presets"
import styles from "../../views/shared/styles"

const CollapsibleFilterList = ({
  filters,
  categoryKeys,
  aggregatedCategories,
  updateQuery,
  heading,
}) => (
  <Collapsible heading={heading}>
    {categoryKeys.map(c => (
      <button
        key={c}
        className={filters.includes(c) ? `selected` : ``}
        onClick={() => {
          if (filters.includes(c)) {
            updateQuery(() => {
              return { filters: filters.filter(f => f !== c) }
            })
          } else {
            updateQuery(() => {
              return { filters: [...filters, c] }
            })
          }
        }}
        css={styles.filterButton}
      >
        <div
          css={{
            color: filters.includes(c) ? colors.gatsby : colors.ui.bright,
            ...scale(0),
            marginRight: 8,
          }}
        >
          {filters.includes(c) ? (
            <MdCheckbox style={{ verticalAlign: `-0.125em` }} />
          ) : (
            <MdCheckboxBlank style={{ verticalAlign: `-0.125em` }} />
          )}
        </div>
        <div
          css={{
            color: filters.includes(c) ? colors.gatsby : false,
            marginRight: `auto`,
          }}
        >
          {c}
        </div>
        <div css={styles.filterCount}>{aggregatedCategories[c]}</div>
      </button>
    ))}
  </Collapsible>
)

export default CollapsibleFilterList
