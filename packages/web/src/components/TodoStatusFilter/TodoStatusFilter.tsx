import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./TodoStatusFilter.module.scss";
import { TFilterTodo, updateFilter } from "@/store/modules/todo";
import { ChevronDown } from "lucide-react";

const TodoStatusFilter = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.title}>Tasks</div>
      <FilterMenu />
    </div>
  );
};

const FilterMenu = () => {
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();

  const handleFilterChange = (filter: TFilterTodo) => {
    dispatch(updateFilter(filter));
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.select}>
          <span>{filter}</span>
          <ChevronDown size={14} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.selectMenu} sideOffset={5}>
          <ul>
            <li>
              <Popover.Close
                className={styles.selectOption}
                onClick={() => handleFilterChange("All")}
              >
                All
              </Popover.Close>
            </li>
            <li>
              <Popover.Close
                className={styles.selectOption}
                onClick={() => handleFilterChange("Done")}
              >
                Done
              </Popover.Close>
            </li>
            <li>
              <Popover.Close
                className={styles.selectOption}
                onClick={() => handleFilterChange("Undone")}
              >
                Undone
              </Popover.Close>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export { TodoStatusFilter };
