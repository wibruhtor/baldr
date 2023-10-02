class BanWordReplacer {
  replace(value: string, replacement: string, banWords: string[]) {
    const regexp = this.getRegExp(banWords);
    return value.replaceAll(regexp, replacement)
  }

  private getRegExp(banWords: string[]) {
    return new RegExp(
      `(${banWords
        .map((word) => {
          return word.split('').join('[`~!@#$%^&*()[\\]{}\\\\/+=|:;"\'<>,.?\\-_ ]*');
        })
        .join('|')})`,
      'gi'
    );
  }
}

export const banWordReplacer = new BanWordReplacer()