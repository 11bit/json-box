import {
  WidgetType,
  EditorView,
  Decoration,
  MatchDecorator,
} from "@codemirror/view";
import { ViewUpdate, ViewPlugin, DecorationSet } from "@codemirror/view";
import { loadWidget } from "./codemirror.css";

class CheckboxWidget extends WidgetType {
  constructor(readonly name: string) {
    super();
  }

  eq(other: CheckboxWidget) {
    return other.name == this.name;
  }

  toDOM() {
    let wrap = document.createElement("span");
    wrap.textContent = this.name;
    wrap.classList.add(loadWidget);
    return wrap;
  }
}

export const placeholderMatcher = new MatchDecorator({
  regexp: /load\("(.*?)"\)/g,

  decorate: (add, from, to, match, view) => {
    add(
      from + "load(".length,
      to - ")".length,
      Decoration.replace({
        widget: new CheckboxWidget(match[1].slice(0, 8)),
      })
    );
  },
});

export const cmLoadExpressionWidget = ViewPlugin.fromClass(
  class {
    placeholders: DecorationSet;
    constructor(view: EditorView) {
      this.placeholders = placeholderMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.placeholders = placeholderMatcher.updateDeco(
        update,
        this.placeholders
      );
    }
  },
  {
    decorations: (instance) => instance.placeholders,
    provide: (plugin) =>
      EditorView.atomicRanges.of((view) => {
        return view.plugin(plugin)?.placeholders || Decoration.none;
      }),
  }
);
