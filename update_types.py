import re
with open('/home/gladwin/Documents/Personal/azure-deployments-talk/lib/presentation/types.ts', 'r') as f:
    content = f.read()

old_statement = """export interface StatementSlideData extends BaseSlide {
  type: 'statement';
  statement: string;
  subtitle?: string;
  accentColor?: string;
}"""

new_statement = """export interface StatementSlideData extends BaseSlide {
  type: 'statement';
  statement: string;
  subtitle?: string;
  accentColor?: string;
  logos?: { src: string; alt: string; className?: string }[];
}"""

if old_statement in content:
    content = content.replace(old_statement, new_statement)
    with open('/home/gladwin/Documents/Personal/azure-deployments-talk/lib/presentation/types.ts', 'w') as f:
        f.write(content)
    print("Updated types.ts")
else:
    print("Still could not find it.")
